import { Preset } from 'apply'

Preset.setName('oanhnn/moleculerjs')
  .option('docker', false)
  .option('eslint', false)
  .option('gitlab', false)
  .option('github', false)
  .option('typescript', false)

// Preset.hook(() => {})

// Default
Preset.group((preset) => {
  preset
    .extract('default')
    .withDots(true)
    .whenConflict(Preset.isInteractive() ? 'ask' : 'override')

  preset
    .editNodePackages()
    .addDev('jest', '^26.6')
    .addDev('jest-cli', '^26.6')
    .merge({
      engines: {
        node: '>= 14.14',
      },
    })
}).withTitle('Execute default tasks')

// ESLint
Preset.group((preset) => {
  preset
    .extract('eslint')
    .withDots(true)
    .whenConflict(Preset.isInteractive() ? 'ask' : 'override')

  preset.editNodePackages().delete(['eslint-plugin-prefer-arrow'])

  preset
    .editNodePackages()
    .addDev('eslint', '^7.17')
    .addDev('eslint-config-prettier', '^7.2')
    .addDev('eslint-plugin-import', '^2.22')
    .addDev('eslint-plugin-prettier', '^3.3')
    .addDev('prettier', '^2.2')
})
  .withTitle('Execute ESLint tasks')
  .ifOption('eslint')

// Typescript
Preset.group((preset) => {
  preset
    .editNodePackages()
    .delete([
      'dependencies.typescript',
      'dependencies.@types/jest',
      'dependencies.@types/mkdirp',
      'dependencies.@types/node',
    ])

  preset
    .editNodePackages()
    .addDev('typescript', '^4.1')
    .addDev('@types/jest', '^26.0')
    .addDev('@types/mkdirp', '^1.0')
    .addDev('@types/node', '^14.14')
    .addDev('ts-jest', '^26.5')
    .addDev('ts-node', '^9.1')

  preset
    .extract('typescript/tsconfig.json')
    .to('tsconfig.json')
    .whenConflict(Preset.isInteractive() ? 'ask' : 'override')

  preset
    .extract('typescript/.eslintrc.js')
    .to('.eslintrc.js')
    .whenConflict(Preset.isInteractive() ? 'ask' : 'override')
    .ifOption('eslint')

  preset
    .editNodePackages()
    .addDev('eslint-import-resolver-typescript', '^2.3')
    .ifOption('eslint')
})
  .withTitle('Execute Typescript task')
  .ifOption('typescript')

// Docker
Preset.group((preset) => {
  preset
    .extract('docker')
    .withDots(true)
    .whenConflict(Preset.isInteractive() ? 'ask' : 'override')
})
  .withTitle('Execute Docker task')
  .ifOption('docker')

// GitHub
Preset.group((preset) => {
  preset
    .extract('github')
    .withDots(true)
    .whenConflict(Preset.isInteractive() ? 'ask' : 'override')
})
  .withTitle('Execute Github tasks')
  .ifOption('github')

// Gitlab
Preset.group((preset) => {
  preset
    .extract('gitlab')
    .whenConflict(Preset.isInteractive() ? 'ask' : 'override')
})
  .withTitle('Execute Gitlab tasks')
  .ifOption('gitlab')

// Install NodeJS dependencies
Preset.installDependencies('node')
  .withTitle('Install NodeJS dependencies')
  .ifUserApproves()
