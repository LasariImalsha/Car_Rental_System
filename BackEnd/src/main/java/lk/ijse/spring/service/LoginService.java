package lk.ijse.spring.service;

import lk.ijse.spring.dto.LoginDTO;

public interface LoginService {
    void saveLogData(LoginDTO dto);

    String generateLoginId();

    LoginDTO searchLogin(String loginId);

    String getLastLoginId();
}
