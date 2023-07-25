package LG_Internship.Server.Ingredient;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DeviceIngredientsDTO {
    private String name;
    private String ingredientPhoto;
    private int amount;
    private LocalDate validDate;
}
