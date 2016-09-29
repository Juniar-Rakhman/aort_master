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
                new Optional(), // Location
                new Optional(), // Department
                new Optional(), // Session
                new Optional(), // AppliedFeedback
                new Optional(), // Moderator Comment 1
                new Optional(), // Moderator Comment 2
                new Optional(), // Moderator Comment 3
                new Optional(), // Teacher
                new Optional(), // Teacher Email
                new Optional(), // Teacher Office Phone
                new Optional(), // Teacher Department
                new Optional(), // Moderator
                new Optional(), // Lead Observer
                new Optional(), // Lead Observer Email
                new Optional(), // Lead Observer Office Phone
                new Optional(), // Peer Observer
                new Optional(), // Peer Observer Email
                new Optional(), // Peer Observer Office Phone
                new Optional(), // Rating Reference
                new Optional(), // Learning Coach
                new Optional(), // Line Manager
                new Optional(), // HOD
                new Optional(), // Status
        };
    }
}
