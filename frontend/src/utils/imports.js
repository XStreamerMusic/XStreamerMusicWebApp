const images = import.meta.glob("../assets/giveaways/*-gift-card.png", {
    eager: true,
    import: "default"
})

export function getGiveawayImage(slug) {
    // converts "spotify-premium" → file match
    const key = Object.keys(images).find(path =>
        path.includes(slug)
    )

    return images[key]
}