package nz.ac.ara.aort.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by juniar_r on 8/15/2016.
 */
@Controller
public class WebController {
    
    @RequestMapping(value="/home")
    public String index() {

        return "index";
    }
}
