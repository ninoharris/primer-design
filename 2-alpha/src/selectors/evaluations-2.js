import { createSelector } from "reselect";
import { RESites } from "../api/restrictionSites";
import {
  getUFV,
  getURV,
  getUFG,
  getURG,
  getCurrentExercise, 
  getVectorRestrictionSites, 
  getBothHaystackStrands, 
  getHaystackForwardRestrictionSites, 
  getHaystackReverseRestrictionSites 
} from "./index";

// This one is a doosie
export const getEvaluations = createSelector(
  getUFV,
  getURV,
  getUFG,
  getURG,
  getCurrentExercise,
  getVectorRestrictionSites,
  getBothHaystackStrands,
  getHaystackForwardRestrictionSites,
  getHaystackReverseRestrictionSites,
  (FV, RV, FG, RG, exercise, vectorRESites, haystack, )
)

