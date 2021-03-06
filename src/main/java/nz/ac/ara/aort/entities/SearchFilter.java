package nz.ac.ara.aort.entities;

import lombok.Data;

import java.sql.Date;

/**
 * Created by Juniar_R on 9/22/2016.
 */
@Data
public class SearchFilter {
    private String staff; //string, ""
    private String leadObserver; //string, ""
    private Date startDate; //default today
    private Date endDate; //default today
    private String completed; //true, false, ""
}
