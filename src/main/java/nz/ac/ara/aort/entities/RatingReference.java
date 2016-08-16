package nz.ac.ara.aort.entities;


import lombok.Data;

import javax.persistence.*;

/**
 * Created by a9jr5626 on 8/11/16.
 * @author Sulthonyh
 * @version 1.0
 * @created 12-Aug-2016 4:11:46 PM
 */
@Data
@Entity
@Table(name = "rating_reference")
public class RatingReference {

	@Id@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(name = "rating", columnDefinition = "nvarchar(50)")
	private String rating;

	public RatingReference(){

	}

	public void finalize() throws Throwable {

	}

}