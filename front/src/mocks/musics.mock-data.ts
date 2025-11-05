interface MockMusic {
    id: string
    name: string
    type: string
    image: string
}

interface Result {

}

const mockMusics: MockMusic[] = [
    {
        id: "1",
        name: "Music 1",
        type: "Gospel",
        image: "/logo.png"
    },
    {
        id: "2",
        name: "Music 2",
        type: "Gospel",
        image: "/logo.png"
    },
]

const mockResults: Result[] = [
    { class: "staff", probability: 0.995248 },
    { class: "tupleBracket", probability: 0.995229 },
    { class: "clefG", probability: 0.946408 },
    { class: "augmentationDot", probability: 0.936787 },
    { class: "coda", probability: 0.936261 },
    { class: "stem", probability: 0.931326 },
    { class: "timeSigCutCommon", probability: 0.926845 },
    { class: "noteheadBlackOnLine", probability: 0.925626 },
    { class: "noteheadBlackOnLineSmall", probability: 0.924292 },
    { class: "brace", probability: 0.83573 },
    { class: "ledgerLine", probability: 0.829585 },
    { class: "clefF", probability: 0.82216 },
    { class: "beam", probability: 0.820125 },
    { class: "slur", probability: 0.812075 },
    { class: "clefCTenor", probability: 0.801293 },
    { class: "noteheadHalfOnLine", probability: 0.624146 },
    { class: "noteheadHalfOnLineSmall", probability: 0.567728 },
    { class: "noteheadBlackInSpaceSmall", probability: 0.563904 },
    { class: "restWhole", probability: 0.551274 },
    { class: "noteheadDoubleWholeInSpaceSmall", probability: 0.535598 }
]

export { mockMusics, mockResults }