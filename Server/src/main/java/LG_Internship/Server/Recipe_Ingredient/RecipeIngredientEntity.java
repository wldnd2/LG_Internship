package LG_Internship.Server.Recipe_Ingredient;

import LG_Internship.Server.Ingredient.IngredientEntity;
import LG_Internship.Server.Recipe.RecipeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "RecipeIngredient")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecipeIngredientEntity {

    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingredient_id")
    private IngredientEntity ingredient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id")
    private RecipeEntity recipe;

    private int amount;

}
