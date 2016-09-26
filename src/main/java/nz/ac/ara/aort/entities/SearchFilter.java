package nz.ac.ara.aort.entities;

import com.sun.org.apache.xpath.internal.operations.Bool;
import lombok.Data;

import java.sql.Date;

/**
 * Created by Juniar_R on 9/22/2016.
 */
@Data
public class SearchFilter {
    private String staff; //string, ""
    private String leadObserver; //string, ""
    private Date date;  //date, ""
    private String completed; //true, false, ""
}
