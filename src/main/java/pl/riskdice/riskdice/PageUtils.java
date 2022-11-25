package pl.riskdice.riskdice;

public enum PageUtils {
    HOME("index"),

    GAME_SETTINGS("game-settings"),
    PLAY("play"),
    RULES("rules");

    private final String pageName;
    PageUtils(String pageName) {
        this.pageName = pageName;
    }

    public String getPageName() {
        return pageName;
    }
}
