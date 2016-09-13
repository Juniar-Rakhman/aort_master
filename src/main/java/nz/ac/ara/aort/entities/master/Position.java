package nz.ac.ara.aort.entities.master;


import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

/**
 * Created by a9jr5626 on 8/11/16.
 * @author Sulthonyh
 * @version 1.0
 * @created 12-Aug-2016 4:11:46 PM
 */
@Data
@Entity
@Table(name = "position")
public class Position {

	@Id
	@Column(name = "position_id", columnDefinition = "nvarchar(50)")
	private String id;

	@Column(name = "is_active")
	private short isActive;

	@Column(name = "manager_position_id", columnDefinition = "nvarchar(50)")
	private String lineManager;
	@Transient
	private String lineManagerTitle;

	@Transient
	@ManyToMany(mappedBy="positions")
	private List<Staff> staffs;
	
	@Column(name = "title", columnDefinition = "nvarchar(100)")
	private String title;
	
	@Column(name = "fte")
	private BigDecimal FTE;
	
	public Position(){
	}

	public void finalize() throws Throwable {
	}

}