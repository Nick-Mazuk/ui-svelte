const readline = require("readline")
const fs = require('fs')
const path = require('path')

const TEMPLATE_LOCATION = 'cli/templates'

const getComponentName = () => {
    let componentName = process.argv[2]
    if (
        typeof componentName === 'string'
        && componentName !== ''
        && componentName !== 'undefined'
    )
        return componentName

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    return new Promise((resolve) => {
        let response = ''
        const prompt = 'Name the component: '
        
        rl.setPrompt(prompt)
        rl.prompt()

        rl.on('line', (input) => {
            let error
            if (input.match(/[_A-Z]/u)) error = 'use kabob case'
            if (input.match(/[/]/u)) error = "don't use a folder"
            if (input === '') error = 'cannot be blank'
            if (error) {
                rl.setPrompt(`Invalid: ${error}\n${prompt}`)
                rl.prompt()
                return
            }
            response = input
            rl.close()
        })

        rl.on('close', () => {
            const splitResponse = response.split('-')
            const componentName = splitResponse.map((part) => (
                part.charAt(0).toUpperCase() + part.slice(1)
            )).join('')
            resolve({ fileName: response, componentName })
        })
    })
}

const copyFile = (currentName, targetPath, fileName, componentName) => {;
    const contents = fs.readFileSync(path.join(TEMPLATE_LOCATION, currentName)).toString()
    let newContents = contents.replace(/component-template/g, fileName)
    newContents = newContents.replace(/ComponentTemplate/g, componentName)

    const targetFileName = currentName.replace('component-template', fileName)
    const targetFilePath = path.join(targetPath, targetFileName)

    fs.writeFileSync(path.join(targetPath, targetFileName), newContents)
    console.log('+ ' + targetFilePath)
}

const main = async () => {
    const { fileName, componentName } = await getComponentName()
    const folderName = `src/${fileName}`
    if (!fs.existsSync(folderName)) fs.mkdirSync(folderName)

    const templateFiles = fs.readdirSync(TEMPLATE_LOCATION)
    templateFiles.forEach((file) => {
        copyFile(file, folderName, fileName, componentName)
    })
    console.log('Component created at ' + folderName)
}

main()