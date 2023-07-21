package LG_Internship.Server.Device;

import LG_Internship.Server.Device_Ingredient.DeviceIngredientEntity;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "Device")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@EntityListeners(AuditingEntityListener.class)
@ToString
@Builder
public class DeviceEntity {

    @Id
    private Long deviceId;

    @CreatedDate
    @Column(name = "created_date", nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "device", cascade = CascadeType.MERGE)
    @Builder.Default
    private List<DeviceIngredientEntity> deviceIngredientList = new ArrayList<>();

    public void addDeviceIngredient(DeviceIngredientEntity deviceIngredient) {
        this.deviceIngredientList.add(deviceIngredient);
    }
}
