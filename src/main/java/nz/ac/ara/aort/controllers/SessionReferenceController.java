package nz.ac.ara.aort.controllers;

import nz.ac.ara.aort.entities.SessionReference;
import nz.ac.ara.aort.repositories.SessionReferenceRepository;
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
public class SessionReferenceController {

    @Autowired
    SessionReferenceRepository sessionRefRepo;

    @RequestMapping(value = "/api/sessionReferencesPage", method = RequestMethod.GET)
    public ResponseEntity<Page> sessionReferencesPage(@RequestParam("page") int page, @RequestParam("size") int size) {
        Pageable pageRequest = new PageRequest(page, size);
        List<SessionReference> sessionReferences = (List<SessionReference>)sessionRefRepo.findAll();

        PagedListHolder<SessionReference> pageList = new PagedListHolder<>(sessionReferences);
        pageList.setPage(pageRequest.getPageNumber());
        pageList.setPageSize(pageRequest.getPageSize());

        Page<SessionReference> sessionReferencePage = new PageImpl<>(pageList.getPageList(), pageRequest, sessionReferences.size());
        return new ResponseEntity<>(sessionReferencePage, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/sessionReferences", method = RequestMethod.GET)
    public ResponseEntity<List<SessionReference>> sessionReferences() {
        List<SessionReference> sessionReferences = (List<SessionReference>)sessionRefRepo.findAll();
        return new ResponseEntity<>(sessionReferences, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/sessionReferences", method = RequestMethod.POST)
    public ResponseEntity<SessionReference> sessionReferenceAdd(@RequestBody SessionReference sessionReference) {
        try {
            sessionRefRepo.save(sessionReference);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(sessionReference, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/sessionReferences", method = RequestMethod.PUT)
    public ResponseEntity<SessionReference> sessionReferenceModify(@RequestBody SessionReference sessionReference) {
        try {
            sessionRefRepo.save(sessionReference);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(sessionReference, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/sessionReferences", method = RequestMethod.DELETE)
    public ResponseEntity<String> sessionReferenceDelete(@RequestBody String id) {
        try {
            sessionRefRepo.delete(Long.parseLong(id));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
