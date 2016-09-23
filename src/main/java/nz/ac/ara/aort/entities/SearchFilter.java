package nz.ac.ara.aort.entities;

import com.sun.org.apache.xpath.internal.operations.Bool;
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
    private Boolean completed;
}
