package camt.se331.templeProject.service;

import camt.se331.templeProject.entity.History;

import java.util.List;

/**
 * Created by Dell on 5/4/2558.
 */
public interface HistoryService {
    public List<History> getHistory();
    public History updateHistory(History history);
    public History addHistory(History history);
}
