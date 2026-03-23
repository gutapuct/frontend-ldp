module.exports = {
	name: `node-version-check-plugin`,
	factory: async (require) => {
		const path = require('path');
		const semver = require('semver');
		const { readFileSync } = require('fs');

		const coerceVersion = version => semver.coerce(version).version;
		const isMajorDiff = diff => diff === `major`;
		const throwErrorByCondition = (condition, errorMessage, shouldClearStack = false) => {
			if (condition) {
				const error = new Error(errorMessage);

				if (shouldClearStack) {
					error.stack = error.stack.replace(error.message, '');
				}

				throw error;
			}
		};

		const checkEngines = (workspaces, shouldClearStack) => {
			let incorrectPackagesMessage = '';

			workspaces.forEach(workspace => {
				const { engines } = workspace.manifest.raw;

				if (!!engines && !!engines.node) {
					const correctedVersion = coerceVersion(engines.node);
					const diff = semver.diff(process.version, correctedVersion);

					if (isMajorDiff(diff)) {
						incorrectPackagesMessage = `${incorrectPackagesMessage}${incorrectPackagesMessage.length === 0 ? '' : ', '}в package.json -> engines -> node проекта "${workspace.manifest.name.name}" (${correctedVersion})`;
					}
				}
			});

			throwErrorByCondition(incorrectPackagesMessage.length !== 0, `
[36mБУ! Испугался? Не бойся! Я друг![0m
    [31mВерсия Node.js должна совпадать с мажорной версией ${incorrectPackagesMessage}[0m
    [31mТекущая версия Node.js ${process.version}[0m
    [36mОбнови Node.js и попробуй снова[0m
`, shouldClearStack);
		};
		const checkNvmRc = (nvmrcPath, shouldClearStack) => {
			let nvmrc = '';

			try {
				nvmrc = readFileSync(nvmrcPath);
			} catch (error) {
				throwErrorByCondition(error.code === 'ENOENT', `
[36mБУ! Испугался? Не бойся! Я друг![0m
	[31mФайл .nvmrc не найден[0m
	[36mСоздай файл .nvmrc с версией Node.js и попробуй снова[0m
`, shouldClearStack);
			}

			const nvmrcContent = nvmrc.toString().replace('\n', '');
			const diff = semver.diff(process.version, coerceVersion(nvmrcContent));

			throwErrorByCondition(isMajorDiff(diff), `
[36mБУ! Испугался? Не бойся! Я друг![0m
    [31mВерсия Node.js должна совпадать с мажорной версией в .nvmrc (${nvmrcContent})[0m
    [31mТекущая версия Node.js (${process.version})[0m
    [36mОбнови Node.js и попробуй снова[0m
`, shouldClearStack);
		};

		const checkSemver = ({ cwd, workspaces }, shouldClearStack = false) => {
			// не запускаем проверки для установки vscode sdk
			if (process.argv.includes('dlx')) {
				return;
			}

			// хак с регуляркой для фикса бага на винде, где cwd почему-то C:\C:\
			// https://github.com/yarnpkg/berry/issues/6697
			checkNvmRc(path.resolve(cwd.replace(/^\/(\w:)/, '$1'), '.nvmrc'), shouldClearStack);

			const isMonorepo = workspaces.length > 1;
			const workspaceCheckList = isMonorepo ? workspaces.slice(1) : [workspaces[0]];
			checkEngines(workspaceCheckList, shouldClearStack);
		};

		return {
			default: {
				hooks: {
					validateProject(project) {
						checkSemver(project);
					},
					wrapScriptExecution(executor, project) {
						checkSemver(project, true);

						return executor;
					},
				},
			},
		};
	},
};
