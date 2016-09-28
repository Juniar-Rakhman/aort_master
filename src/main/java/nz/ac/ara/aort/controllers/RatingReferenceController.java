package nz.ac.ara.aort.controllers;

import nz.ac.ara.aort.entities.RatingReference;
import nz.ac.ara.aort.repositories.RatingReferenceRepository;
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
 * Created by Galih_P on 9/7/2016.
 */
@RestController
public class RatingReferenceController {

    @Autowired
    RatingReferenceRepository ratingRefRepo;

    @RequestMapping(value = "/api/ratingReferencesPage", method = RequestMethod.GET)
    public ResponseEntity<Page> ratingReferencesPage(@RequestParam("page") int page, @RequestParam("size") int size) {
        Pageable pageRequest = new PageRequest(page, size);
        List<RatingReference> ratingReferences = (List<RatingReference>)ratingRefRepo.findAll();

        PagedListHolder<RatingReference> pageList = new PagedListHolder<>(ratingReferences);
        pageList.setPage(pageRequest.getPageNumber());
        pageList.setPageSize(pageRequest.getPageSize());

        Page<RatingReference> ratingReferencePage = new PageImpl<>(pageList.getPageList(), pageRequest, ratingReferences.size());
        return new ResponseEntity<>(ratingReferencePage, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/ratingReferences", method = RequestMethod.GET)
    public ResponseEntity<List<RatingReference>> ratingReferences() {
        List<RatingReference> ratingReferences = (List<RatingReference>)ratingRefRepo.findAll();
        return new ResponseEntity<>(ratingReferences, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/ratingReferences", method = RequestMethod.POST)
    public ResponseEntity<RatingReference> ratingReferenceAdd(@RequestBody RatingReference ratingReference) {
        try {
            ratingRefRepo.save(ratingReference);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(ratingReference, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/ratingReferences", method = RequestMethod.PUT)
    public ResponseEntity<RatingReference> ratingReferenceModify(@RequestBody RatingReference ratingReference) {
        try {
            ratingRefRepo.save(ratingReference);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(ratingReference, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/ratingReferences", method = RequestMethod.DELETE)
    public ResponseEntity<RatingReference> ratingReferenceDelete(@RequestBody RatingReference ratingReference) {
        try {
            ratingRefRepo.delete(ratingReference.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(ratingReference, HttpStatus.OK);
    }
}
