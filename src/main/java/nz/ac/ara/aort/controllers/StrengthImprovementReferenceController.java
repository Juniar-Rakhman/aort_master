package nz.ac.ara.aort.controllers;

import nz.ac.ara.aort.entities.StrengthImprovementReference;
import nz.ac.ara.aort.repositories.StrengthImprovementReferenceRepository;
import nz.ac.ara.aort.entities.Category;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
 * Created by Galih_P on 9/5/2016.
 */
@RestController
public class StrengthImprovementReferenceController {

    @Autowired
    StrengthImprovementReferenceRepository strImpRefRepo;

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/api/strengthImprovementReferences/page", method = RequestMethod.GET)
    public ResponseEntity<Page> strengthImprovementReferencesPage(@RequestParam("page") int page, @RequestParam("size") int size) {
        Pageable pageRequest = new PageRequest(page, size);
        List<StrengthImprovementReference> strengthImprovementReferences = (List<StrengthImprovementReference>)strImpRefRepo.findAllOrderByCategory();

        PagedListHolder<StrengthImprovementReference> pageList = new PagedListHolder<>(strengthImprovementReferences);
        pageList.setPage(pageRequest.getPageNumber());
        pageList.setPageSize(pageRequest.getPageSize());

        Page<StrengthImprovementReference> strengthImprovementReferencePage = new PageImpl<>(pageList.getPageList(), pageRequest, strengthImprovementReferences.size());
        return new ResponseEntity<>(strengthImprovementReferencePage, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/strengthImprovementReferences", method = RequestMethod.GET)
    public ResponseEntity<List<StrengthImprovementReference>> strengthImprovementReferences() {
        List<StrengthImprovementReference> strengthImprovementReferences = (List<StrengthImprovementReference>)strImpRefRepo.findAllOrderByCategory();
        return new ResponseEntity<>(strengthImprovementReferences, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/strengthImprovementReferences/category", method = RequestMethod.GET)
    public ResponseEntity<List<String>> strengthImprovementCategories() {
        List<String> strengthImprovementCategories = (List<String>)strImpRefRepo.findAllCategories();
        return new ResponseEntity<>(strengthImprovementCategories, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/strengthImprovementReferences", method = RequestMethod.POST)
    public ResponseEntity<StrengthImprovementReference> strengthImprovementReferenceAdd(@RequestBody StrengthImprovementReference strengthImprovementReference) {
        try {
            strImpRefRepo.save(strengthImprovementReference);
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
        }
        return new ResponseEntity<>(strengthImprovementReference, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/strengthImprovementReferences/category", method = RequestMethod.PUT)
    public ResponseEntity<Category> strengthImprovementReferenceModifyCategory(@RequestBody Category category) {
        try {
            strImpRefRepo.updateCategory(category.getOldCategory(), category.getNewCategory());
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
        }
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/strengthImprovementReferences", method = RequestMethod.DELETE)
    public ResponseEntity<StrengthImprovementReference> strengthImprovementReferenceDelete(@RequestBody StrengthImprovementReference strengthImprovementReference) {
        try {
            strImpRefRepo.delete(strengthImprovementReference.getId());
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.getMessage());
        }
        return new ResponseEntity<>(strengthImprovementReference, HttpStatus.OK);
    }
}
