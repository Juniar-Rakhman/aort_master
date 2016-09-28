package nz.ac.ara.aort.controllers;

import nz.ac.ara.aort.entities.DepartmentReference;
import nz.ac.ara.aort.repositories.DepartmentReferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Galih_P on 9/21/2016.
 */
@RestController
public class DepartmentReferenceController {

    @Autowired
    DepartmentReferenceRepository departmentRefRepo;

    @RequestMapping(value = "/api/departmentReferencesPage", method = RequestMethod.GET)
    public ResponseEntity<Page> campusReferencesPage(@RequestParam("page") int page, @RequestParam("size") int size) {
        Pageable pageRequest = new PageRequest(page, size);
        List<DepartmentReference> departmentReferences = (List<DepartmentReference>)departmentRefRepo.findAll();

        PagedListHolder<DepartmentReference> pageList = new PagedListHolder<>(departmentReferences);
        pageList.setPage(pageRequest.getPageNumber());
        pageList.setPageSize(pageRequest.getPageSize());

        Page<DepartmentReference> departmentReferencePage = new PageImpl<>(pageList.getPageList(), pageRequest, departmentReferences.size());
        return new ResponseEntity<>(departmentReferencePage, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/departmentReferences", method = RequestMethod.GET)
    public ResponseEntity<List<DepartmentReference>> departmentReferences() {
        List<DepartmentReference> departmentReferences = (List<DepartmentReference>)departmentRefRepo.findAll();
        return new ResponseEntity<>(departmentReferences, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/departmentReferences", method = RequestMethod.POST)
    public ResponseEntity<DepartmentReference> departmentReferenceAdd(@RequestBody DepartmentReference departmentReference) {
        try {
            departmentRefRepo.save(departmentReference);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(departmentReference, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/departmentReferences", method = RequestMethod.PUT)
    public ResponseEntity<DepartmentReference> departmentReferenceModify(@RequestBody DepartmentReference departmentReference) {
        try {
            departmentRefRepo.save(departmentReference);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(departmentReference, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/departmentReferences", method = RequestMethod.DELETE)
    public ResponseEntity<DepartmentReference> departmentReferenceDelete(@RequestBody DepartmentReference departmentReference) {
        try {
            departmentRefRepo.delete(departmentReference.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(departmentReference, HttpStatus.OK);
    }
}
