package com.javaweb.newswebsite.api.output;

import java.util.ArrayList;
import java.util.List;

import com.javaweb.newswebsite.dto.CmtChildDTO;

public class CmtChildOutput {
	private int page;
	private int totalPage;
	private List<CmtChildDTO> listCmtChild = new ArrayList<>();
	private String sortName;
	private String sortBy;
	private int totalUser;
	private String keyword;
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	public List<CmtChildDTO> getListCmtChild() {
		return listCmtChild;
	}
	public void setListCmtChild(List<CmtChildDTO> listCmtChild) {
		this.listCmtChild = listCmtChild;
	}
	public String getSortName() {
		return sortName;
	}
	public void setSortName(String sortName) {
		this.sortName = sortName;
	}
	public String getSortBy() {
		return sortBy;
	}
	public void setSortBy(String sortBy) {
		this.sortBy = sortBy;
	}
	public int getTotalUser() {
		return totalUser;
	}
	public void setTotalUser(int totalUser) {
		this.totalUser = totalUser;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	
	
}
