package lk.ijse.spring.controller;

import lk.ijse.spring.dto.LoginDTO;
import lk.ijse.spring.service.LoginService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * @author _ Pathum_Kaleesha
 * @since - v0.1.0
 **/

@RestController
@RequestMapping("api/v1/login")
@CrossOrigin
public class LoginController {

    @Autowired
    LoginService service;

    @GetMapping(path = "/getLastLogin",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getLastLoginId(){
        LoginDTO dto = service.searchLogin(service.getLastLoginId());
        System.out.println(dto.toString());
        return new ResponseUtil(200,"done",dto);
    }

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveLogin(@RequestBody LoginDTO dto){
        service.saveLogData(dto);
        return new ResponseUtil(200,"saved",true);
    }

    @GetMapping(path = "/generateLogId",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil generateLogId(){
        return new ResponseUtil(200,"ok",service.generateLoginId());
    }
}
