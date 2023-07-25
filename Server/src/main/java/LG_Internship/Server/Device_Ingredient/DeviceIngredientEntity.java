package LG_Internship.Server.Device_Ingredient;


import LG_Internship.Server.Device.DeviceEntity;
import LG_Internship.Server.Ingredient.IngredientEntity;
import lombok.*;
import net.bytebuddy.asm.Advice;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity(name = "DeviceIngredient")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class DeviceIngredientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

//    @EmbeddedId
//    private DeviceIngredientId id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "ingredient_id")

    private IngredientEntity ingredient;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "device_id")
    private DeviceEntity device;

    private int amount;

    private LocalDate validDate;
    public void setAmount(int amount) {
        this.amount = amount;
    }
    public void setValidDate( LocalDate validDate ) { this.validDate = validDate; }
}
