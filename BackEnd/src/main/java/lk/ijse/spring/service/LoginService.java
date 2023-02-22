package lk.ijse.spring.service;

import lk.ijse.spring.dto.LoginDTO;

public interface LoginService {
    void saveLogData(LoginDTO dto);

    String generateLoginId();

    String generateLastLoginId();

    LoginDTO searchLogin(String loginId);
}
