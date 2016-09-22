package nz.ac.ara.aort.controllers;

import nz.ac.ara.aort.entities.CampusReference;
import nz.ac.ara.aort.repositories.CampusReferenceRepository;
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
public class CampusReferenceController {

    @Autowired
    CampusReferenceRepository campusRefRepo;

    @RequestMapping(value = "/api/campusReferencesPage", method = RequestMethod.GET)
    public ResponseEntity<Page> campusReferencesPage(@RequestParam("page") int page, @RequestParam("size") int size) {
        Pageable pageRequest = new PageRequest(page, size);
        List<CampusReference> campusReferences = (List<CampusReference>)campusRefRepo.findAll();

        PagedListHolder<CampusReference> pageList = new PagedListHolder<>(campusReferences);
        pageList.setPage(pageRequest.getPageNumber());
        pageList.setPageSize(pageRequest.getPageSize());

        Page<CampusReference> campusReferencePage = new PageImpl<>(pageList.getPageList(), pageRequest, campusReferences.size());
        return new ResponseEntity<>(campusReferencePage, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/campusReferences", method = RequestMethod.GET)
    public ResponseEntity<List<CampusReference>> campusReferences() {
        List<CampusReference> campusReferences = (List<CampusReference>)campusRefRepo.findAll();
        return new ResponseEntity<>(campusReferences, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/campusReferences", method = RequestMethod.POST)
    public ResponseEntity<CampusReference> campusReferenceAdd(@RequestBody CampusReference campusReference) {
        try {
            campusRefRepo.save(campusReference);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(campusReference, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/campusReferences", method = RequestMethod.PUT)
    public ResponseEntity<CampusReference> campusReferenceModify(@RequestBody CampusReference campusReference) {
        try {
            campusRefRepo.save(campusReference);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(campusReference, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/campusReferences", method = RequestMethod.DELETE)
    public ResponseEntity<String> campusReferenceDelete(@RequestBody String id) {
        try {
            campusRefRepo.delete(Long.parseLong(id));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
