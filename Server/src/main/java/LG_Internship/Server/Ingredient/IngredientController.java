package LG_Internship.Server.Ingredient;


import LG_Internship.Server.Device.DeviceEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class IngredientController {
    private final IngredientService ingredientService;

    @PostMapping("/ingredients")
    public ResponseEntity<List<DeviceIngredientsDTO>> refreshDeviceIngredients(@RequestBody IngredientsRequest data){
        log.info("data : " + data.getDeviceId() + " " + data.getApple());

        DeviceEntity device = ingredientService.findDevice(data.getDeviceId());


        return new ResponseEntity<>(ingredientService.refreshIngredient(device, data), HttpStatus.valueOf(200));

    }
    @GetMapping("/ingredients")
    public ResponseEntity<List<DeviceIngredientsDTO>> getDeviceIngredients(@RequestParam(value = "deviceid", defaultValue = "0") Long device_id){
        List<DeviceIngredientsDTO> response = ingredientService.getDeviceIngredientsList(device_id);
        if(response == null) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/ingredients/list")
    public ResponseEntity<List<IngredientDTO>> getIngredientsList(){
        return new ResponseEntity<>(ingredientService.getIngredientsList(), HttpStatus.OK);
    }

}
