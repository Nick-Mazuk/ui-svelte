module.exports = {
    branches: 'main',
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'angular',
                releaseRules: [
                    { type: 'docs', scope: 'README', release: 'patch' },
                    { type: 'refactor', release: 'patch' },
                    { type: 'style', release: 'patch' },
                    { type: 'bump', release: 'patch' },
                ],
                parserOpts: {
                    noteKeywords: ['BREAKING'],
                },
            },
        ],
        '@semantic-release/release-notes-generator',
        '@semantic-release/npm',
        '@semantic-release/github',
        [
            '@semantic-release/changelog',
            {
                changelogFile: 'CHANGELOG.md',
            },
        ],
    ],
}
