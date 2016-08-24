package nz.ac.ara.aort.entities;

import lombok.Data;

import javax.persistence.*;

/**
 * Created by juniar_r on 8/24/2016.
 */
@Data
@Entity
@Table(name = "observation_recommendation")
public class ObservationRecommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "observation_id")
    private Observation observation;

    @Column(name = "focus_area", columnDefinition = "nvarchar(50)")
    private String focusArea;

    @Column(name = "improve_or_strength")
    private Boolean improveOrStrength;

    @Column(name = "recommended_action", columnDefinition = "nvarchar(250)")
    private String recommendedAction;

    public ObservationRecommendation() {
    }

    public void finalize() throws Throwable {
    }
}
