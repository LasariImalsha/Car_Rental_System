package lk.ijse.spring.service;

import lk.ijse.spring.dto.AdminDTO;

import java.util.List;

public interface AdminServices {
    void saveAdmin(AdminDTO dto);

    void updateAdmin(AdminDTO dto);

    void deleteAdmin(String id);

    boolean findAdminByUserName(String username);

    boolean findAdminByPassword(String password);

    List<AdminDTO> getAllAdmins();

    String generateAdminId();
}
