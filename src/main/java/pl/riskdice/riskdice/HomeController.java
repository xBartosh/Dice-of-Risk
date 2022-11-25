package pl.riskdice.riskdice;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import static pl.riskdice.riskdice.PageUtils.*;

@Controller
public class HomeController {

    @GetMapping("/")
    String home() {
        return HOME.getPageName();
    }

    @GetMapping("/game-settings")
    String gameSettings() {
        return GAME_SETTINGS.getPageName();
    }

    @GetMapping("/play")
    String play(Model model, @RequestParam List<String> players, @RequestParam Integer rounds, @RequestParam Integer player) {
        model.addAttribute("players", players);
        model.addAttribute("rounds", rounds);
        model.addAttribute("noOfPlayers", player);
        return PLAY.getPageName();
    }

    @GetMapping("/rules")
    String rules() {
        return RULES.getPageName();
    }
}
