package nz.ac.ara.aort.controllers;

import nz.ac.ara.aort.entities.Observation;
import nz.ac.ara.aort.entities.Position;
import nz.ac.ara.aort.repositories.PositionRepository;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Galih_P on 9/8/2016.
 */
@RestController
public class PositionController {

    @Autowired
    PositionRepository positionRepo;

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value = "/api/positions", method = RequestMethod.GET)
    public ResponseEntity<Page> positionFindAll(@RequestParam("page") int page, @RequestParam("size") int size) {
        Pageable pageRequest = new PageRequest(page, size);
        List<Position> positions = (List<Position>)positionRepo.findAll();
        Page<Position> positionPage = getPositionPage(positions, pageRequest);
        return new ResponseEntity<>(positionPage, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/positions/search/findByTitle", method = RequestMethod.GET)
    public ResponseEntity<Page> positionFindByTitle(@RequestParam("title") String title, @RequestParam("page") int page, @RequestParam("size") int size) {
        Pageable pageRequest = new PageRequest(page, size);
        List<Position> positions = positionRepo.findByTitle(title);
        Page<Position> positionPage = getPositionPage(positions, pageRequest);
        return new ResponseEntity<>(positionPage, HttpStatus.OK);
    }

    private Page<Position> getPositionPage(List<Position> positions, Pageable pageRequest) {
        PagedListHolder<Position> pageList = new PagedListHolder<>(positions);
        pageList.setPage(pageRequest.getPageNumber());
        pageList.setPageSize(pageRequest.getPageSize());
        return new PageImpl<>(fetchPosition(pageList.getPageList()), pageRequest, positions.size());
    }

    private List<Position> fetchPosition(List<Position> positions) {
        for (Position position : positions) {
            if(position.getLineManager() != null && !position.getLineManager().isEmpty()) {
                Position lineManagerPos = positionRepo.findOne(position.getLineManager());
                position.setLineManagerTitle(lineManagerPos.getTitle());
            }
        }

        return positions;
    }

}
