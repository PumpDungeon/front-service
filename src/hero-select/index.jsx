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
                  <span onClick={() => setHero("akhy_remy")}
                        className={hero === "akhy_remy" ? "hero-icon selected-hero" : "hero-icon"}>
                        <img src="/akhy_remy.png" alt="Akhy Remy" className="hero-image" />
                  </span>
            </div>
      )
}