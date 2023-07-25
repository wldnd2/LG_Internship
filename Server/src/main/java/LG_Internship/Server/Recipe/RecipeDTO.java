package LG_Internship.Server.Recipe;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class RecipeDTO {

    private String recipeName;
    private String recipeDescription;
    private String recipeURL;
    private String recipePhoto;
}
