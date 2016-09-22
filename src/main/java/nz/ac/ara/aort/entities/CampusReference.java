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
@Table(name = "campus_reference")
public class CampusReference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "campus", columnDefinition = "nvarchar(100)")
    private String campus;

    @Column(name = "is_active")
    private Boolean active;
}
