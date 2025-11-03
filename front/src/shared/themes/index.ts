const modules = import.meta.glob('./*.ts', { eager: true })

const themes = Object.entries(modules)
    .filter(([path]) => path !== './index.ts')
    .map(([path, module]) => {
        const rawName = path.replace('./', '').replace('.js', '')
        const name = rawName.charAt(0).toUpperCase() + rawName.slice(1)
        const value = module
        return {
            name,
            value,
        }
    })

export default themes