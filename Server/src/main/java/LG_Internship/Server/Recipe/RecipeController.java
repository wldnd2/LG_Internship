package LG_Internship.Server.Recipe;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class RecipeController {
    private final RecipeService recipeService;
    @GetMapping("/recipe")
    public ResponseEntity<List<RecipeDTO>> getRecipe(RecipeRequest recipeRequest){
        if(recipeRequest == null) log.info("recipe Request : null");
        log.info(recipeRequest.toString());
        List<RecipeDTO> recipeDTOS = recipeService.getRecipe(recipeRequest);
        return new ResponseEntity<>(recipeDTOS, HttpStatus.OK);
    }

}
