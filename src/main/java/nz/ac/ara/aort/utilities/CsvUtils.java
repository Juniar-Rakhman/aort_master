package nz.ac.ara.aort.utilities;

import org.supercsv.cellprocessor.FmtBool;
import org.supercsv.cellprocessor.FmtDate;
import org.supercsv.cellprocessor.Optional;
import org.supercsv.cellprocessor.constraint.LMinMax;
import org.supercsv.cellprocessor.constraint.NotNull;
import org.supercsv.cellprocessor.constraint.UniqueHashCode;
import org.supercsv.cellprocessor.ift.CellProcessor;

/**
 * Created by Juniar_R on 9/28/2016.
 */
public final class CsvUtils {
    
    public static CellProcessor[] getProcessors() {

        return new CellProcessor[] {
                new UniqueHashCode(), // Id
                new FmtDate("dd/MM/yyyy"), // Date
                new Optional(), // Time
                new Optional(), // LateLearners
                new Optional(), // Moderated
                new Optional(), // Moderated
                new Optional(), // Programme
                new Optional(), // ProgrammeLevel
                new Optional(), // Notes
                new Optional(), // RatingSummary
                new Optional(), // RegisteredLearners
                new Optional(), // SessionContext
                new Optional(), // LessonPlan
                new Optional(), // LessonPlanComment
                new Optional(), // CourseOutline
                new Optional(), // CourseOutlineComment
                new Optional(), // StartLearners
                new Optional(), // TotalLearners
                new Optional(), // AdditionalComments
                new Optional(), // CourseCode
                new Optional(), // CourseLevel
                new Optional(), // CourseName
                
        };
    }
}
