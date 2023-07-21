package LG_Internship.Server.Ingredient;

import LG_Internship.Server.Device_Ingredient.DeviceIngredientEntity;
import LG_Internship.Server.Recipe_Ingredient.RecipeIngredientEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "Ingredient")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class IngredientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ingredientId;

    // Ingredients name ex) apple, banana
    private String name;

    private int validDay;

    private String ingredientPhoto;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "ingredient")
    private List<RecipeIngredientEntity> recipeIngredientList = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "ingredient")
    private List<DeviceIngredientEntity> deviceIngredientList = new ArrayList<>();

    public void addDeviceIngredient(DeviceIngredientEntity deviceIngredient) {
        this.deviceIngredientList.add(deviceIngredient);
    }

}
