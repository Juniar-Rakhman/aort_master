package nz.ac.ara.aort.repositories;

import nz.ac.ara.aort.entities.StrengthImprovementReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by a9jr5626 on 8/12/16.
 */
public interface StrengthImprovementReferenceRepository extends CrudRepository<StrengthImprovementReference, Long> {

    @Query("SELECT DISTINCT(s) FROM StrengthImprovementReference s ORDER BY category ASC")
    List<StrengthImprovementReference> findAllOrderByCategory();

    @Query("SELECT DISTINCT(s.category) FROM StrengthImprovementReference s ORDER BY category ASC")
    List<String> findAllCategories();

    @Query("SELECT s FROM StrengthImprovementReference s WHERE s.category LIKE %:filter% OR s.criteria LIKE %:filter%")
    Page<StrengthImprovementReference> findByCategoryOrCriteria(@Param("filter") String filter, Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE StrengthImprovementReference SET category = :newCategory WHERE category = :oldCategory")
    void updateCategory(@Param("oldCategory") String oldCategory, @Param("newCategory") String newCategory);

    @Query("SELECT s FROM StrengthImprovementReference s WHERE s.active = :active ORDER BY category ASC")
    List<StrengthImprovementReference> findByActive(@Param("active") boolean active);
}
