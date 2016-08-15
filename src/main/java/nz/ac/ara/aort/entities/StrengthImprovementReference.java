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
@Table(name = "strength_improvement_reference")
public class StrengthImprovementReference {

	@Column(name = "category")
	public String category;
	@Column(name = "criteria")
	public String criteria;
	@Id@GeneratedValue(strategy = GenerationType.AUTO)
	public Long id;

	public StrengthImprovementReference(){

	}

	public void finalize() throws Throwable {

	}

}