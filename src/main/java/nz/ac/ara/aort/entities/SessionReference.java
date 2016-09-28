package nz.ac.ara.aort.entities;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Galih_P on 9/21/2016.
 */
@Data
@Entity
@Table(name = "session_reference")
public class SessionReference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "session ", columnDefinition = "nvarchar(100)")
    private String session;

    @Column(name = "is_active")
    private Boolean active;
}
