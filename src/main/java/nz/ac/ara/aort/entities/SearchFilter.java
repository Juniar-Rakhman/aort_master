package nz.ac.ara.aort.entities;

import lombok.Data;

import java.sql.Date;

/**
 * Created by Juniar_R on 9/22/2016.
 */
@Data
public class SearchFilter {
    private String staff;
    private String leadObserver;
    private Date date;
    private String status;
}
