package LG_Internship.Server.Recipe;

import LG_Internship.Server.Recipe_Ingredient.RecipeIngredientEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name="Recipe")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RecipeEntity {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private long recipeId;

    @Column(length = 3000)
    private String recipe_description;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "recipe")
    private List<RecipeIngredientEntity> recipeIngredientList = new ArrayList<>();

//    // Photo and site URL
//    private String recipe_url;
//    private String recipe_photo;

}
