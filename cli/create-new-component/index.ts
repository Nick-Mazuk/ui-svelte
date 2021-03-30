import path from 'path'
import readline from 'readline'

import fs from 'fs-extra'

const TEMPLATE_LOCATION = 'cli/create-new-component/templates'

const isValidInput = (input: unknown): { valid: boolean; error: string } => {
    if (typeof input !== 'string') return { valid: false, error: 'must be a string' }
    if (input === '') return { valid: false, error: 'cannot be blank' }
    if (input.match(/[_A-Z]/u)) return { valid: false, error: 'use kabob case' }
    return { valid: true, error: '' }
}

const getComponentName = (): string | Promise<string> => {
    // eslint-disable-next-line prefer-destructuring -- unwieldy otherwise
    const initialInput = process.argv[2]
    if (isValidInput(initialInput).valid) return initialInput

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise((resolve) => {
        let response = ''
        const prompt = 'Name the component: '

        rl.setPrompt(prompt)
        rl.prompt()

        rl.on('line', (input) => {
            const { valid, error } = isValidInput(input)
            if (!valid) {
                rl.setPrompt(`Invalid: ${error}\n${prompt}`)
                rl.prompt()
                return
            }
            response = input
            rl.close()
        })

        rl.on('close', () => {
            if (response === '') process.exit(0)
            resolve(response)
        })
    })
}

const parseComponentName = (
    name: string
): { fileName: string; componentName: string; categoryName: string; folderName: string } => {
    const splitPath = name.split('/')
    const fileName = splitPath.pop() ?? ''
    const splitName = fileName.split('-')
    const componentName = splitName
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')
    const filePath = splitPath.join('/')
    const categoryName = filePath
        .split('/')
        .map((folder) => {
            return folder
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
        })
        .join('/')
    const folderName = path.join('src', filePath, fileName)
    return { fileName, componentName, categoryName, folderName }
}

const copyFile = (
    currentName: string,
    targetPath: string,
    fileName: string,
    componentName: string,
    categoryName: string
) => {
    const contents = fs.readFileSync(path.join(TEMPLATE_LOCATION, currentName)).toString()
    let newContents = contents.replace(/component-template/gu, fileName)
    newContents = newContents.replace(
        /ComponentTemplateWithCategory/gu,
        `${categoryName}/${componentName}`
    )
    newContents = newContents.replace(/ComponentTemplate/gu, componentName)

    const targetFileName = currentName.replace('component-template', fileName)
    const targetFilePath = path.join(targetPath, targetFileName)

    fs.writeFileSync(path.join(targetPath, targetFileName), newContents)
    console.log(`+ ${targetFilePath}`)
}

const main = async () => {
    const name = await getComponentName()
    const { fileName, componentName, categoryName, folderName } = parseComponentName(name)

    fs.ensureDirSync(folderName)
    const templateFiles = fs.readdirSync(TEMPLATE_LOCATION)
    templateFiles.forEach((file) => {
        copyFile(file, folderName, fileName, componentName, categoryName)
    })
    console.log(`Component created at ${folderName}`)
}

main()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
