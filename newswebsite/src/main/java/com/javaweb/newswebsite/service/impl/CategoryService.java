package com.javaweb.newswebsite.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javaweb.newswebsite.converter.CategoryConverter;
import com.javaweb.newswebsite.dto.CategoryDTO;
import com.javaweb.newswebsite.entity.CategoryEntity;
import com.javaweb.newswebsite.repo.CategoryRepository;
import com.javaweb.newswebsite.service.ICategoryService;
@Service

public class CategoryService implements ICategoryService {

	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private CategoryConverter categoryConverter;

	@Override
	public CategoryDTO save(CategoryDTO categoryDto) {
		
			CategoryEntity categoryEntity = new CategoryEntity();
			if (categoryDto.getId() != null) { // update
				CategoryEntity oldCategoryEntity = categoryRepository.findCategoryByCode(categoryDto.getCode()).get();
			    categoryEntity = categoryConverter.toEntity(categoryDto, oldCategoryEntity);
			} else { // insert
				categoryEntity = categoryConverter.toEntity(categoryDto);
			}
			categoryEntity = categoryRepository.save(categoryEntity);
			return categoryConverter.toDTO(categoryEntity);
		}

	@Override
       public void delete(Long[] ids) {
        for (Long id:ids){
            categoryRepository.deleteById(id);
            }
	
            }
}