export const HeroSelect = ({ setHero, hero }) => {
    return (
        <div className="hero-select">
                  <span onClick={() => setHero("🐐")}
                        className={hero === "🐐" ? "hero-icon selected-hero" : "hero-icon"}>🐐</span>
            <span onClick={() => setHero("🦽")}
                  className={hero === "🦽" ? "hero-icon selected-hero" : "hero-icon"}>🦽</span>
            <span onClick={() => setHero("🏎️")}
                  className={hero === "🏎️" ? "hero-icon selected-hero" : "hero-icon"}>🏎️</span>
            <span onClick={() => setHero("🐀")}
                  className={hero === "🐀" ? "hero-icon selected-hero" : "hero-icon"}>🐀</span>
        </div>
    )
}
