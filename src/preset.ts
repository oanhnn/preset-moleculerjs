import { Preset } from 'apply'

Preset.setName('oanhnn/moleculerjs')
  .option('docker', false)
  .option('eslint', false)
  .option('gitlab', false)
  .option('github', false)
  .option('typescript', false)

Preset.hook(() => {})

Preset.extract('default')
  .withDots(true)
  .whenConflict(Preset.isInteractive() ? 'ask' : 'override')
  .withTitle('Copy default files')

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
    .addDev('typescript', '^4.0')
    .addDev('@types/jest', '^25.1')
    .addDev('@types/mkdirp', '^1.0')
    .addDev('@types/node', '^14.14')

  preset.editNodePackages().merge({
    engines: {
      node: '>= 12.x.x',
    },
  })

  preset
    .extract('typescript')
    .whenConflict(Preset.isInteractive() ? 'ask' : 'override')
})
  .withTitle('Install Typescript')
  .ifOptionEquals('typescript', true)

// Docker
Preset.extract('docker')
  .whenConflict(Preset.isInteractive() ? 'ask' : 'override')
  .withTitle('Copy Docker config files')
  .ifOptionEquals('docker', true)

// GitHub
Preset.extract('github')
  .whenConflict(Preset.isInteractive() ? 'ask' : 'override')
  .withTitle('Copy Github config files')
  .ifOptionEquals('github', true)

// Gitlab
Preset.extract('gitlab')
  .whenConflict(Preset.isInteractive() ? 'ask' : 'override')
  .withTitle('Copy Gitlab config files')
  .ifOptionEquals('gitlab', true)

// Clean up
Preset.delete(['phpunit.xml', '.styleci.yml']).withTitle('Clean up')

// Install NodeJS dependencies
Preset.installDependencies('node')
  .withTitle('Install NodeJS dependencies')
  .ifUserApproves()
