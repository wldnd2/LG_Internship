package LG_Internship.Server.Ingredient;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DeviceIngredientsDTO {
    private String name;

    private int validDay;

    private String ingredientPhoto;

    private int amount;
}
