package LG_Internship.Server.Ingredient;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class IngredientDTO {
    private String name;
    private int validDay;
    private String ingredientPhoto;
}
