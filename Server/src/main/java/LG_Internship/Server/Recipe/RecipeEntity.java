package LG_Internship.Server.Recipe;

import LG_Internship.Server.Recipe_Ingredient.RecipeIngredientEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name="Recipe")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecipeEntity {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private long recipeId;

    private String recipeName;
    @Column(length = 3000)
    private String recipeDescription;
    // Photo and site URL
    private String recipeUrl;
    private String recipePhoto;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "recipe")
    private List<RecipeIngredientEntity> recipeIngredientList = new ArrayList<>();

    public void addRecipeIngredient(RecipeIngredientEntity recipeIngredient){
        this.recipeIngredientList.add(recipeIngredient);
    }

}
