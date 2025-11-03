const modules = import.meta.glob('./*.ts', { eager: true })
const usedModules = Object.entries(modules).filter(([path]) => path !== './index.ts')

let handlers: any[] = []

Object.values(usedModules).forEach(([_, mod]) => {
    const m = mod as { default?: any[] }
    if (m.default && Array.isArray(m.default)) {
        handlers.push(...m.default)
    }
})

export default handlers
